package org.imooc;

import org.imooc.factory.Factory;
import org.imooc.factory.FactoryBuilder;
import org.imooc.plant.Plant;

//要改,还要改很多处;改漏了,对于新版本就是bug;反复代码,咋办?封装！
public class Function {
    public void put(String name,int number) throws Exception {
//        创建工厂
        Factory factory= FactoryBuilder.buildByClassName(name);
//        从工厂获得植物
        Plant plant= factory.createPlant();
        System.out.println("将"+ plant.getName()+"放在"+number+"草地上！");
        plant.fight();
    }
}
