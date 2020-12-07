package org.imooc.plant;

import org.imooc.component.Arms;
import org.imooc.component.Hair;

import java.util.Collection;

public class Bean implements Plant{
    private Hair hair;
    private Arms arms;

    public Hair getHair() {
        return hair;
    }

    public void setHair(Hair hair) {
        this.hair = hair;
    }

    public Arms getArms() {
        return arms;
    }

    public void setArms(Arms arms) {
        this.arms = arms;
    }

    public String getName(){
        return "绿逗";
    }
    public void fight(){
        System.out.println("发射一颗豆子");
    }
}
