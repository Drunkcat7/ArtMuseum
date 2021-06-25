package com.example.artmuseum.entity;

import java.io.Serializable;

/**
 * (Advertising)实体类
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
public class Advertising implements Serializable {
    private static final long serialVersionUID = -67002821939443752L;

    private Integer id;

    private String imglink;

    private String title;

    private String info;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImglink() {
        return imglink;
    }

    public void setImglink(String imglink) {
        this.imglink = imglink;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

}
