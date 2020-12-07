package org.imooc.factory;

import org.imooc.component.Arms;
import org.imooc.component.Hair;
import org.imooc.plant.Bean;
import org.imooc.plant.Plant;

public class BeanFactory implements Factory{
    public Plant createPlant(){
        Bean bean =new Bean();
        Hair hair = new Hair();//头发,武器
        Arms arms = new Arms();
        hair.setColor("green");//给头发设置颜色
        bean.setHair(hair);//带上头发
        arms.setBulletType("普通的豆子");//给武器设置子弹类型
        bean.setArms(arms);//使用武器
        return bean;
    }
}
