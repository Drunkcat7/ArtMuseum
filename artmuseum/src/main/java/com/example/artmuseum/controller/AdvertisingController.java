package com.example.artmuseum.controller;

import com.example.artmuseum.entity.Advertising;
import com.example.artmuseum.service.AdvertisingService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Advertising)表控制层
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
@RestController
@RequestMapping("advertising")
public class AdvertisingController {
    /**
     * 服务对象
     */
    @Resource
    private AdvertisingService advertisingService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Advertising selectOne(Integer id) {
        return this.advertisingService.queryById(id);
    }

//    -- 主页轮播图
    @CrossOrigin
    @PostMapping("showAdvertising")
    public List<Advertising> showPublicInfo() {
        Advertising advertising = new Advertising();
        return this.advertisingService.queryAll(advertising);
    }
}
