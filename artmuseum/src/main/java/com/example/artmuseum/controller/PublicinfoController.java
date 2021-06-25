package com.example.artmuseum.controller;

import com.example.artmuseum.entity.Publicinfo;
import com.example.artmuseum.service.PublicinfoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * (Publicinfo)表控制层
 *
 * @author makejava
 * @since 2021-06-20 09:01:41
 */
@RestController
@RequestMapping("publicinfo")
public class PublicinfoController {
    /**
     * 服务对象
     */
    @Resource
    private PublicinfoService publicinfoService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Publicinfo selectOne(Integer id) {
        return this.publicinfoService.queryById(id);
    }
//    上传图片 传入(imglink,title,info)
    @CrossOrigin
    @PostMapping("uploadPublicInfo")
    public boolean uploadPublicInfo(String imglink,String title,String info) {
        boolean flag = false;
//        如果传入的name和imgkey不为空
        System.out.println(imglink + title + info);
        if (imglink!= "" && title!="" && info!="") {
            Publicinfo publicinfo = new Publicinfo();
            publicinfo.setImglink(imglink);
            publicinfo.setTitle(title);
            publicinfo.setInfo(info);
            this.publicinfoService.insertByImglinkTitleInfo(publicinfo);
            flag = true;
        }else {
            flag = false;
        }

        return flag;
    }

//    -- 主页展示所有图
    @CrossOrigin
    @PostMapping("showPublicInfo")
    public List<Publicinfo> showPublicInfo() {
        Publicinfo publicinfo = new Publicinfo();
        return this.publicinfoService.queryAll(publicinfo);
    }
    //-- 个人页展示所有图（传入用户id）
    @CrossOrigin
    @PostMapping("showPrivateInfo")
    public List<Publicinfo> showPrivateInfo(Integer userNo) {
        return this.publicinfoService.queryByUserNo(userNo);
    }

//    -- 搜索 (传入title)
    @CrossOrigin
    @PostMapping("searchPublicInfo")
    public Map<String,Object> searchPublicInfo(String title) {
        Map<String,Object> map = new HashMap<>();
        title = "%"+title+"%";
        if (this.publicinfoService.queryByTitle(title).size()!=0){
            map.put("data",this.publicinfoService.queryByTitle(title));
            map.put("start",true);
        }else {
            map.put("start",false);
        }
        return map;
    }

        // -- 点赞 传入画publicinfo的id
        @CrossOrigin
        @PostMapping("addLikePublicInfo")
        public Integer addLikePublicInfo(Integer id) {
                Publicinfo publicinfo = this.publicinfoService.queryById(id);
                publicinfo.setLike(publicinfo.getLike()+1);
                publicinfoService.update(publicinfo);
            return this.publicinfoService.queryById(id).getLike();
        }

        // -- 取消点赞 传入画publicinfo的id
        @CrossOrigin
        @PostMapping("cancelLikePublicInfo")
        public Integer cancelLikePublicInfo(Integer id) {
        Publicinfo publicinfo = this.publicinfoService.queryById(id);
        if (publicinfo.getLike() > 0) {
            publicinfo.setLike(publicinfo.getLike() - 1);
        }
        publicinfoService.update(publicinfo);
        return this.publicinfoService.queryById(id).getLike();
    }

}
