package com.example.artmuseum.controller;

import com.example.artmuseum.entity.User;
import com.example.artmuseum.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * (User)表控制层
 *
 * @author makejava
 * @since 2021-06-19 13:25:24
 */

@RestController
@RequestMapping("/user")
public class UserController {
    /**
     * 服务对象
     */
    @Resource
    private UserService userService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @CrossOrigin
    @GetMapping("/selectOne")
    public User selectOne(Integer id) {
        return this.userService.queryById(id);
    }

    @CrossOrigin
    @PostMapping("/userName")
    public Map<String, Object> userName(Integer id) {
        Map<String,Object> map = new HashMap<>();
        if (this.userService.queryById(id)!= null) {
            User u = this.userService.queryById(id);
            u.setImgkey(null);
            map.put("data",u);
            map.put("start",true);
        }
        else{
            map.put("start",false);
        }
        return map;
    }

    //用户登陆
    @CrossOrigin
//    @GetMapping("userLogin")
    @PostMapping("userLogin")
    public Map<String, Object> userLogin(String imgkey) {
        Map<String,Object> map = new HashMap<>();
        if (userService.queryByImgKey(imgkey)!= null) {
            map.put("data",this.userService.queryByImgKey(imgkey));
            map.put("start",true);
        }
        else{
            map.put("start",false);
        }
        System.out.println(this.userService.queryByImgKey(imgkey));
//        return this.userService.queryByImgKey(imgkey);
        return map;
    }

//    用户注册
//    insertByNameImgKey
    @CrossOrigin
    @PostMapping("userSignIn")
    public boolean userSignIn(String name,String imgkey) {
        boolean flag = false;
//        如果传入的name和imgkey不为空
        System.out.println(name + imgkey);
        if (name!= "" && imgkey!="") {
            User user = new User();
            user.setName(name);
            user.setImgkey(imgkey);
            this.userService.insertByNameImgKey(user);
            flag = true;
        }
        else{
            flag = false;
        }
        return flag;
    }
}
