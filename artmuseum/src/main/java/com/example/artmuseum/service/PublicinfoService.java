package com.example.artmuseum.service;

import com.example.artmuseum.entity.Publicinfo;

import java.util.List;

/**
 * (Publicinfo)表服务接口
 *
 * @author makejava
 * @since 2021-06-20 09:01:39
 */
public interface PublicinfoService {
    //    查询所有照片
    List<Publicinfo> queryAll(Publicinfo publicinfo);
    //  -- 上传图片 传入(imglink,title,info)
    Publicinfo insertByImglinkTitleInfo(Publicinfo publicinfo);

    //  -- 个人页展示所有图（传入用户id）
    List<Publicinfo> queryByUserNo(int userNo);

    //    -- 搜索 (传入title)
    List<Publicinfo> queryByTitle(String title);

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Publicinfo queryById(Integer id);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Publicinfo> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param publicinfo 实例对象
     * @return 实例对象
     */
    Publicinfo insert(Publicinfo publicinfo);

    /**
     * 修改数据
     *
     * @param publicinfo 实例对象
     * @return 实例对象
     */
    Publicinfo update(Publicinfo publicinfo);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);

}
