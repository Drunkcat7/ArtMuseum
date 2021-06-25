package com.example.artmuseum.dao;

import com.example.artmuseum.entity.Privateinfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * (Privateinfo)表数据库访问层
 *
 * @author makejava
 * @since 2021-06-19 16:54:11
 */
public interface PrivateinfoDao {
//-- 个人页展示所有图（传入用户id）
//    List<Privateinfo> queryByUserNo(@Param("userNo") int userNo);

//-- 收藏 (传入用户id和图片id)
    int insertByUserNoImgNo(Privateinfo privateinfo);

    //    -- 取消收藏 (传入用户id和图片id)
    int deleteByUserNoImgNo(Integer userNo,Integer imgNo);

    //-- 小红心 传入id 和 图片id 功能：查看是否收藏（有数据就代表收藏了）
    List<Privateinfo> queryByUserNoImgNo(@Param("userNo") int userNo, @Param("imgNo") int imgNo);

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Privateinfo queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Privateinfo> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param privateinfo 实例对象
     * @return 对象列表
     */
    List<Privateinfo> queryAll(Privateinfo privateinfo);

    /**
     * 新增数据
     *
     * @param privateinfo 实例对象
     * @return 影响行数
     */
    int insert(Privateinfo privateinfo);

    /**
     * 批量新增数据（MyBatis原生foreach方法）
     *
     * @param entities List<Privateinfo> 实例对象列表
     * @return 影响行数
     */
    int insertBatch(@Param("entities") List<Privateinfo> entities);

    /**
     * 批量新增或按主键更新数据（MyBatis原生foreach方法）
     *
     * @param entities List<Privateinfo> 实例对象列表
     * @return 影响行数
     */
    int insertOrUpdateBatch(@Param("entities") List<Privateinfo> entities);

    /**
     * 修改数据
     *
     * @param privateinfo 实例对象
     * @return 影响行数
     */
    int update(Privateinfo privateinfo);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

}

