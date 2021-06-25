package com.example.artmuseum.entity;

import java.io.Serializable;

/**
 * (Publicinfo)实体类
 *
 * @author makejava
 * @since 2021-06-20 09:01:36
 */
public class Publicinfo implements Serializable {
    private static final long serialVersionUID = 961409340500675152L;

    private Integer id;

    private String imglink;

    private String title;

    private String info;

    private Integer like;


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

    public Integer getLike() {
        return like;
    }

    public void setLike(Integer like) {
        this.like = like;
    }

}
