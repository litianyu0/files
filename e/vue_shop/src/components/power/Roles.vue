<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/home">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片布局 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" style="width: 100%" stripe border>
        <!-- 展开列 -->

        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom' , i1===0 ? 'bdtop' : '' ,'vcenter'] "
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                  :class="['bdbottom' , i1===0 ? 'bdtop' : ''  ,'vcenter']"
                >
                  <!-- 左二级 -->
                  <el-col :span="6">
                    <el-tag
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      type="success"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 右三级 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3,i3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名词"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <!-- 修改 -->
            <el-button
              @click="showEditDialog(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            >修改</el-button>
            <!-- 删除 -->
            <el-button
              @click="removeRolesById(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            >删除</el-button>
            <!-- 分配角色 -->
            <el-tooltip :enterable="false" effect="dark" content="分配权限" placement="top">
              <el-button
                @click="showSetRightDialog(scope.row)"
                type="warning"
                icon="el-icon-setting"
                size="mini"
              >分配角色</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" @close="editDialogClosed" width="50%">
      <!-- 内容 -->
      <el-form ref="editFormRef" :rules="editFormRules" :model="editForm" label-width="80px">
        <el-form-item label="角色名词" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      @close="setRightDialogClosed"
      width="50%"
    >
      <!-- 内容 -->

      <el-tree
        show-checkbox
        ref="treeRef"
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        :data="rightList"
        :props="treeProps"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      // 编辑角色对象
      editForm: {},
      editDialogVisible: false,
      editFormRules: {
        roleName: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ]
      },
      setRightDialogVisible: false,
      // 所有权限数据
      rightList: [],
      // 树形控件对象
      treeProps: {
        label: "authName",
        children: "children"
      },
      // 默认选择Id节点的值
      defKeys: [],
      // 当前即将分配权限id
      roleId: ""
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      // console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取角色列表失败");
      }
      this.rolesList = res.data;
      // console.log(this.rolesList);
    },
    // 修改用户对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("roles/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询失败");
      }
      this.editForm = res.data;
      // console.log(this.editForm);
      this.editDialogVisible = !this.editDialogVisible;
    },
    // 关闭事件
    editDialogClosed() {
      // console.log(this.$refs);
      this.$refs.editFormRef.resetFields();
    },
    // 编辑表单预验证
    editRoles() {
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return;
        console.log(this.editForm);

        // this.editForm.roleId = this.rolesList.id;
        const { data: res } = await this.$http.put(
          "roles/" + this.editForm.roleId,
          {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc,
            id: this.editForm.roleId
          }
        );

        if (res.meta.status !== 200) {
          return console.log(res.meta.status);
          return this.$message.error("提交失败");
        }

        this.editDialogVisible = false;
        this.getRolesList();
        this.$message.success("提交成功！");
      });
    },
    // 删除角色
    async removeRolesById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.$message.info("取消");
      }
      const { data: res } = await this.$http.delete("roles/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功！");
      this.getRolesList();
    },
    // 删除权限
    async removeRightById(roles, rightId) {
      console.log(roles);
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      if (confirmResult != "confirm") {
        return this.$message.info("取消了");
      }
      const { data: res } = await this.$http.delete(
        `roles/${roles.id}/rights/${rightId}`
      );
      if (res.meta.status !== 200) {
        return console.log(res.meta.status);
        return this.$message.error("删除失败！");
      }
      this.$message.success("删除成功");
      // 权限返回
      roles.children = res.data;
    },
    // 展示权限分配对话框
    async showSetRightDialog(roles) {
      this.roleId = roles.id;
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200) {
        return this.$message.error("获取失败");
      }
      this.rightList = res.data;
      // console.log(this.rightList);
      //获取三级节点
      this.getLeafKeys(roles, this.defKeys);

      this.setRightDialogVisible = true;
    },
    getLeafKeys(node, arr) {
      // 判断是否三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr);
      });
    },
    //分配权限对话框关闭
    setRightDialogClosed() {
      this.defKeys = [];
    },
    //点击分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      console.log(this.roleId, keys);
      const idStr = keys.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        {
          rids: idStr
        }
      );
      if (res.meta.status !== 200) {
        // return console.log(res.meta.status);
        return this.$message.error("分配权限失败");
      }
      this.$message.success("分配成功");
      // this.$refs.treeRef
      this.getRolesList();
      this.setRightDialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
  padding: 0 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>