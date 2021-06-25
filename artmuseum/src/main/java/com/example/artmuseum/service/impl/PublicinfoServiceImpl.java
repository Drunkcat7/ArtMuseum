package com.example.artmuseum.service.impl;

import com.example.artmuseum.entity.Publicinfo;
import com.example.artmuseum.dao.PublicinfoDao;
import com.example.artmuseum.service.PublicinfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Publicinfo)表服务实现类
 *
 * @author makejava
 * @since 2021-06-20 09:01:40
 */
@Service("publicinfoService")
public class PublicinfoServiceImpl implements PublicinfoService {

    @Resource
    private PublicinfoDao publicinfoDao;


//    查看所有照片
    public List<Publicinfo> queryAll(Publicinfo publicinfo) {
        return this.publicinfoDao.queryAll(publicinfo);
    }
    //-- 上传图片 传入(imglink,title,info)
    @Override
    public Publicinfo insertByImglinkTitleInfo(Publicinfo publicinfo) {
        this.publicinfoDao.insertByImglinkTitleInfo(publicinfo);
        return publicinfo;
    }

    //-- 个人页展示所有图（传入用户id）
    @Override
    public List<Publicinfo> queryByUserNo(int userNo) {
        return this.publicinfoDao.queryByUserNo(userNo);
    }
//-- 搜索 (传入title)
    @Override
    public List<Publicinfo> queryByTitle(String title) {
        return this.publicinfoDao.queryByTitle(title);
    }


    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Publicinfo queryById(Integer id) {
        return this.publicinfoDao.queryById(id);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    @Override
    public List<Publicinfo> queryAllByLimit(int offset, int limit) {
        return this.publicinfoDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param publicinfo 实例对象
     * @return 实例对象
     */
    @Override
    public Publicinfo insert(Publicinfo publicinfo) {
        this.publicinfoDao.insert(publicinfo);
        return publicinfo;
    }

    /**
     * 修改数据
     *
     * @param publicinfo 实例对象
     * @return 实例对象
     */
    @Override
    public Publicinfo update(Publicinfo publicinfo) {
        this.publicinfoDao.update(publicinfo);
        return this.queryById(publicinfo.getId());
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.publicinfoDao.deleteById(id) > 0;
    }
}
