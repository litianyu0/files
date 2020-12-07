package org.imooc.factory;

import org.imooc.component.Shell;
import org.imooc.plant.Plant;
import org.imooc.plant.Wall;
//新的植物（另一种果墙）
public class NewWallFactory implements Factory{
    public Plant createPlant(){
        Wall wall =new Wall();
        Shell shell = new Shell();//外壳
        shell.setHardness(300);//设置外壳硬度
        wall.setShell(shell);//带上外壳
        return wall;
    }
}
