package com.example.artmuseum.dao;

import com.example.artmuseum.entity.Advertising;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * (Advertising)表数据库访问层
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
public interface AdvertisingDao {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Advertising queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Advertising> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param advertising 实例对象
     * @return 对象列表
     */
    List<Advertising> queryAll(Advertising advertising);

    /**
     * 新增数据
     *
     * @param advertising 实例对象
     * @return 影响行数
     */
    int insert(Advertising advertising);

    /**
     * 批量新增数据（MyBatis原生foreach方法）
     *
     * @param entities List<Advertising> 实例对象列表
     * @return 影响行数
     */
    int insertBatch(@Param("entities") List<Advertising> entities);

    /**
     * 批量新增或按主键更新数据（MyBatis原生foreach方法）
     *
     * @param entities List<Advertising> 实例对象列表
     * @return 影响行数
     */
    int insertOrUpdateBatch(@Param("entities") List<Advertising> entities);

    /**
     * 修改数据
     *
     * @param advertising 实例对象
     * @return 影响行数
     */
    int update(Advertising advertising);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

}

