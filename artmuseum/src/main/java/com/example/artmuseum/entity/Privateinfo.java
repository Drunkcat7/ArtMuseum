package com.example.artmuseum.entity;

import java.io.Serializable;

/**
 * (Privateinfo)实体类
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
public class Privateinfo implements Serializable {
    private static final long serialVersionUID = -92243008224878665L;

    private Integer id;

    private Integer userno;

    private Integer imgno;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserno() {
        return userno;
    }

    public void setUserno(Integer userno) {
        this.userno = userno;
    }

    public Integer getImgno() {
        return imgno;
    }

    public void setImgno(Integer imgno) {
        this.imgno = imgno;
    }

}
