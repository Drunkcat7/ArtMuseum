package com.example.artmuseum.service.impl;

import com.example.artmuseum.entity.Advertising;
import com.example.artmuseum.dao.AdvertisingDao;
import com.example.artmuseum.service.AdvertisingService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Advertising)表服务实现类
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
@Service("advertisingService")
public class AdvertisingServiceImpl implements AdvertisingService {
    @Resource
    private AdvertisingDao advertisingDao;


    public List<Advertising> queryAll(Advertising advertising) {
        return this.advertisingDao.queryAll(advertising);
    }

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Advertising queryById(Integer id) {
        return this.advertisingDao.queryById(id);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    @Override
    public List<Advertising> queryAllByLimit(int offset, int limit) {
        return this.advertisingDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param advertising 实例对象
     * @return 实例对象
     */
    @Override
    public Advertising insert(Advertising advertising) {
        this.advertisingDao.insert(advertising);
        return advertising;
    }

    /**
     * 修改数据
     *
     * @param advertising 实例对象
     * @return 实例对象
     */
    @Override
    public Advertising update(Advertising advertising) {
        this.advertisingDao.update(advertising);
        return this.queryById(advertising.getId());
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.advertisingDao.deleteById(id) > 0;
    }
}
