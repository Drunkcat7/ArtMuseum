package com.example.artmuseum.controller;

import com.example.artmuseum.entity.Privateinfo;
import com.example.artmuseum.entity.Publicinfo;
import com.example.artmuseum.service.PrivateinfoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Privateinfo)表控制层
 *
 * @author makejava
 * @since 2021-06-19 16:54:12
 */
@RestController
@RequestMapping("privateinfo")
public class PrivateinfoController {
    /**
     * 服务对象
     */
    @Resource
    private PrivateinfoService privateinfoService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Privateinfo selectOne(Integer id) {
        return this.privateinfoService.queryById(id);
    }

//    -- 收藏 (传入用户id和图片id)
    @CrossOrigin
    @PostMapping("addPrivateInfo")
    public boolean addPrivateInfo(Integer userNo,Integer imgNo) {
        boolean flag = false;
        if (userNo!= null && imgNo!=null) {
            Privateinfo privateinfo = new Privateinfo();
            privateinfo.setUserno(userNo);
            privateinfo.setImgno(imgNo);
            this.privateinfoService.insertByUserNoImgNo(privateinfo);
            flag = true;
        }
        else{
            flag = false;
        }
        return flag;
    }

//    -- 取消收藏 (传入用户id和图片id)
    @CrossOrigin
    @PostMapping("deletePrivateInfo")
    public boolean deletePrivateInfo(Integer userNo,Integer imgNo) {
        return this.privateinfoService.deleteByUserNoImgNo(userNo,imgNo);
    }

//   -- 小红心 传入id 和 图片id 功能：查看是否收藏（有数据就代表收藏了）
    @CrossOrigin
    @PostMapping("favoritePrivateInfo")
    public boolean favoritePrivateInfo(Integer userNo,Integer imgNo) {
        if (this.privateinfoService.queryByUserNoImgNo(userNo,imgNo).size()>0){
            return true;
        }else {
            return false;
        }

}

}
