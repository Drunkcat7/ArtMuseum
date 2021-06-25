package com.example.artmuseum.service.impl;

import com.example.artmuseum.entity.Privateinfo;
import com.example.artmuseum.dao.PrivateinfoDao;
import com.example.artmuseum.service.PrivateinfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Privateinfo)表服务实现类
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
@Service("privateinfoService")
public class PrivateinfoServiceImpl implements PrivateinfoService {
    @Resource
    private PrivateinfoDao privateinfoDao;

//-- 收藏 (传入用户id和图片id)
    @Override
    public Privateinfo insertByUserNoImgNo(Privateinfo privateinfo) {
        this.privateinfoDao.insertByUserNoImgNo(privateinfo);
        return privateinfo;
    }

    //    -- 取消收藏 (传入用户id和图片id)
    @Override
    public boolean deleteByUserNoImgNo(Integer userNo,Integer imgNo) {
        return this.privateinfoDao.deleteByUserNoImgNo(userNo,imgNo) > 0;
    }

    //-- 小红心 传入id 和 图片id 功能：查看是否收藏（有数据就代表收藏了）
    public List<Privateinfo> queryByUserNoImgNo(Integer userNo,Integer imgNo) {
        return this.privateinfoDao.queryByUserNoImgNo(userNo, imgNo);
    }

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Privateinfo queryById(Integer id) {
        return this.privateinfoDao.queryById(id);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    @Override
    public List<Privateinfo> queryAllByLimit(int offset, int limit) {
        return this.privateinfoDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param privateinfo 实例对象
     * @return 实例对象
     */
    @Override
    public Privateinfo insert(Privateinfo privateinfo) {
        this.privateinfoDao.insert(privateinfo);
        return privateinfo;
    }

    /**
     * 修改数据
     *
     * @param privateinfo 实例对象
     * @return 实例对象
     */
    @Override
    public Privateinfo update(Privateinfo privateinfo) {
        this.privateinfoDao.update(privateinfo);
        return this.queryById(privateinfo.getId());
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.privateinfoDao.deleteById(id) > 0;
    }
}
