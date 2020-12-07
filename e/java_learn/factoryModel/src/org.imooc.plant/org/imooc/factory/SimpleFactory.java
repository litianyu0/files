package org.imooc.factory;
import org.imooc.component.Arms;
import org.imooc.component.Hair;
import org.imooc.component.Shell;
import org.imooc.plant.*;
public class SimpleFactory {
// 创建植物对象的静态方法
    public static Plant createPlant(String name){
        Plant plant=null;
        if(PlantNameConstant.BEAN_NAME.equals(name)){
            Bean bean =new Bean();
            Hair hair = new Hair();//头发,武器
            Arms arms = new Arms();
            hair.setColor("green");//给头发设置颜色
            bean.setHair(hair);//带上头发
            arms.setBulletType("普通的豆子");//给武器设置子弹类型
            bean.setArms(arms);//使用武器
            plant=bean;
        }else if(PlantNameConstant.ICE_NAME.equals(name)){
            Ice ice =new Ice();
            Hair hair = new Hair();
            Arms arms = new Arms();
            hair.setColor("blue");//给头发设置颜色
            ice.setHair(hair);//带上头发
            arms.setBulletType("冰豆子");//给武器设置子弹类型
            ice.setArms(arms);//使用武器
            plant=ice;
        }else if(PlantNameConstant.WALL_NAME.equals(name)){
            Wall wall =new Wall();
            Shell shell = new Shell();
            shell.setHardness(300);//设置外壳硬度
            wall.setShell(shell);//带上外壳
            plant=wall;
        }
        return plant;
    }
//    用反射来创建对象
    public static Plant createPlantClassName(String name) throws Exception {
        return (Plant)Class.forName(name).newInstance();
    }
}
/*这样,工厂模式,问题:
1.复用性地
2.代码维护性低
*/