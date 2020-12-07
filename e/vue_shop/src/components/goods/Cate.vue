<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/home">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片布局 -->
    <el-card>
      <!-- 添加商品按钮 -->
      <el-row>
        <el-col>
          <el-button @click="showAddCateDialog" type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品分类数据表 -->

      <tree-table
        :selection-type="false"
        :expand-type="false"
        show-index
        border
        :data="cateList"
        :columns="columns"
        class="treeTable"
      >
        <!-- 是否有效 -->
        <template v-slot:isok="scope">
          <i class="el-icon-error" v-if="scope.row.cat_deleted === true"></i>
          <i class="el-icon-success" style="color:green" v-else></i>
        </template>

        <!-- 排序 -->
        <template v-slot:order="scope">
          <el-tag v-if="scope.row.cat_level ===0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level ===1" size="mini" type="success">二级</el-tag>

          <el-tag v-else size="mini" type="danger">三级</el-tag>
        </template>

        <!-- 操作 -->
        <template v-slot:opt="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row.cat_id)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeCateById(scope.row.cat_id)"
          >删除</el-button>
        </template>
      </tree-table>

      <!-- 分页 -->
      <!-- 分页 -->
      <el-pagination
        class="pagin"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->

    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      @close="addCateDialogClose"
      width="50%"
    >
      <!-- 内容 -->
      <el-form
        ref="addCateFormRef"
        :rules="addCateFormRules"
        :model="addCateForm"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- <el-input v-model="addCateForm.cat_name"></el-input> -->
          <el-cascader
            :props="cascaderProps"
            v-model="selectdKeys"
            :options="parentCateList"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addCate" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类对话框 -->
    <el-dialog @close="editDialogClosed" title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <!-- 内容 -->
      <el-form ref="editFormRef" :rules="editFormRules" :model="editForm" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="cat_deleted">
          <div @click="ised">
            <i class="el-icon-error" v-if="this.editForm.cat_deleted === true"></i>
            <i class="el-icon-success" style="color:green" v-else></i>
          </div>
        </el-form-item>
        <el-form-item label="排序" prop="cat_level">
          <div>
            <el-tag v-if="this.editForm.cat_level ===0" size="mini">一级</el-tag>
            <el-tag v-else-if="this.editForm.cat_level ===1" size="mini" type="success">二级</el-tag>

            <el-tag v-else size="mini" type="danger">三级</el-tag>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //查询信息
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类数据列表
      cateList: [],
      // 总数据条数
      total: 0,
      //为table指定定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          type: "template",
          template: "order"
        },
        {
          label: "操作",
          type: "template",
          template: "opt"
        }
      ],
      addDialogVisible: false,
      addCateForm: {
        cat_name: "",
        //父级id
        cat_pid: 0,
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      // 父级分类列表
      parentCateList: [],
      // 指定联选择器配置对象
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true
      },
      // 选中父级分类id的数组
      selectdKeys: [],
      // 编辑用户对话框
      editDialogVisible: false,
      // 用户查询到信息
      editForm: {},
      editFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      // 是否有效按钮
      isok: true
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      // console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取角色列表失败");
      }
      this.cateList = res.data.result;
      this.total = res.data.total;
      // console.log(res);
    },
    //pagesize
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    handleCurrentChange(newpagenum) {
      this.queryInfo.pagenum = newpagenum;
      this.getCateList();
    },
    //添加
    showAddCateDialog() {
      this.getParentCateList();
      this.addDialogVisible = true;
    },
    // 获取父级分类列表
    async getParentCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 }
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取失败");
      }
      this.parentCateList = res.data;
      // console.log(this.parentCateList);
    },
    // 选中父级变化
    parentCateChange() {
      // console.log(this.selectdKeys);
      if (this.selectdKeys.length > 0) {
        //父级分类id
        this.addCateForm.cat_pid = this.selectdKeys[
          this.selectdKeys.length - 1
        ];
        // 当前分类赋值
        this.addCateForm.cat_level = this.selectdKeys.length;
        return;
      } else {
        this.addCateForm.cat_pid = 0;
        // 当前分类赋值
        this.addCateForm.cat_level = 0;
      }
    },
    // 点击添加分类
    addCate() {
      // console.log(this.addCateForm);
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "categories",
          this.addCateForm
        );
        if (res.meta.status !== 201) {
          return this.$message.error("添加失败");
        }
        this.$message.success("添加成功！");
        this.getCateList();
        this.addDialogVisible = false;
      });
    },
    // 关闭重置表单
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields();
      this.selectdKeys = [];
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
    },
    // 修改分类对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("categories/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询失败");
      }
      this.editForm = res.data;
      console.log(this.editForm);
      this.isok = this.cat_deleted;
      this.editDialogVisible = !this.editDialogVisible;
    },
    //添加时是否有效
    ised() {
      this.editForm.cat_deleted = !this.editForm.cat_deleted;
      // console.log(this.editForm.cat_deleted);
    },
    // 关闭事件
    editDialogClosed() {
      // console.log(this.$refs);
      this.$refs.editFormRef.resetFields();
    },
    // 编辑表单预验证
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return;
        console.log(this.editForm);
        const { data: res } = await this.$http.put(
          "categories/" + this.editForm.cat_id,
          {
            cat_name: this.editForm.cat_name
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("提交失败");
        }
        this.editDialogVisible = false;
        this.getCateList();
        this.$message.success("提交成功！");
      });
    },
    // 根据Id删除
    async removeCateById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      console.log(id);
      // 确认返回confirm,取消返回cancel
      // console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("categories/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败");
      }
      this.$message.success("删除成功");
      this.getCateList();
    }
  }
};
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.pagin {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
