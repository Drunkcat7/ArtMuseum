package com.example.artmuseum.service;

import com.example.artmuseum.entity.Privateinfo;

import java.util.List;

/**
 * (Privateinfo)表服务接口
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
public interface PrivateinfoService {

//  -- 个人页展示所有图（传入用户id）
//    List<Privateinfo> queryByUserNo(int userNo);
//-- 收藏 (传入用户id和图片id)
    Privateinfo insertByUserNoImgNo(Privateinfo privateinfo);

//    -- 取消收藏 (传入用户id和图片id)
    boolean deleteByUserNoImgNo(Integer userNo,Integer imgNo);

//-- 小红心 传入id 和 图片id 功能：查看是否收藏（有数据就代表收藏了）
    List<Privateinfo> queryByUserNoImgNo(Integer userNo,Integer imgNo);

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Privateinfo queryById(Integer id);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Privateinfo> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param privateinfo 实例对象
     * @return 实例对象
     */
    Privateinfo insert(Privateinfo privateinfo);

    /**
     * 修改数据
     *
     * @param privateinfo 实例对象
     * @return 实例对象
     */
    Privateinfo update(Privateinfo privateinfo);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);

}
