package com.example.artmuseum.service;

import com.example.artmuseum.entity.Advertising;

import java.util.List;

/**
 * (Advertising)表服务接口
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
public interface AdvertisingService {

    //    -- 主页轮播图
    List<Advertising> queryAll(Advertising advertising);

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Advertising queryById(Integer id);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Advertising> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param advertising 实例对象
     * @return 实例对象
     */
    Advertising insert(Advertising advertising);

    /**
     * 修改数据
     *
     * @param advertising 实例对象
     * @return 实例对象
     */
    Advertising update(Advertising advertising);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);

}
