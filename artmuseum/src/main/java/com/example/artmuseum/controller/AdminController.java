package com.example.artmuseum.controller;

import com.example.artmuseum.entity.Admin;
import com.example.artmuseum.service.AdminService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * (Admin)表控制层
 *
 * @author makejava
 * @since 2021-06-19 16:54:10
 */
@RestController
@RequestMapping("admin")
public class AdminController {
    /**
     * 服务对象
     */
    @Resource
    private AdminService adminService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Admin selectOne(Integer id) {
        return this.adminService.queryById(id);
    }

//    -- admin登陆 传入id与password
    @CrossOrigin
    @PostMapping("adminLogin")
    public Map<String, Object> adminLogin(String account , String password) {
        Map<String,Object> map = new HashMap<>();
        if (adminService.queryByAccountPassword(account,password).size()!=0) {
            map.put("data",this.adminService.queryByAccountPassword(account,password));
            map.put("start",true);
        }
        else{
            map.put("start",false);
        }
        return map;
    }
}
