package org.imooc.factory;

import org.imooc.component.Arms;
import org.imooc.component.Hair;
import org.imooc.plant.Ice;
import org.imooc.plant.Plant;

public class IceFactory implements Factory{
    public Plant createPlant(){
        Ice ice =new Ice();
        Hair hair = new Hair();//头发,武器
        Arms arms = new Arms();
        hair.setColor("green");//给头发设置颜色
        ice.setHair(hair);//带上头发
        arms.setBulletType("普通的豆子");//给武器设置子弹类型
        ice.setArms(arms);//使用武器
        return ice;
    }
}
