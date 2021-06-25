package com.example.artmuseum.dao;

import com.example.artmuseum.entity.Publicinfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * (Publicinfo)表数据库访问层
 *
 * @author makejava
 * @since 2021-06-20 09:01:38
 */
public interface PublicinfoDao {
//    查看所有照片

//-- 上传图片 传入(imglink,title,info)
    int insertByImglinkTitleInfo(Publicinfo publicinfo);

    //-- 个人页展示所有图（传入用户id）
    List<Publicinfo> queryByUserNo(@Param("userNo") int userNo);

    //    -- 搜索 (传入title)
    List<Publicinfo> queryByTitle(@Param("title") String title);


    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Publicinfo queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    List<Publicinfo> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param publicinfo 实例对象
     * @return 对象列表
     */
    List<Publicinfo> queryAll(Publicinfo publicinfo);

    /**
     * 新增数据
     *
     * @param publicinfo 实例对象
     * @return 影响行数
     */
    int insert(Publicinfo publicinfo);

    /**
     * 批量新增数据（MyBatis原生foreach方法）
     *
     * @param entities List<Publicinfo> 实例对象列表
     * @return 影响行数
     */
    int insertBatch(@Param("entities") List<Publicinfo> entities);

    /**
     * 批量新增或按主键更新数据（MyBatis原生foreach方法）
     *
     * @param entities List<Publicinfo> 实例对象列表
     * @return 影响行数
     */
    int insertOrUpdateBatch(@Param("entities") List<Publicinfo> entities);

    /**
     * 修改数据
     *
     * @param publicinfo 实例对象
     * @return 影响行数
     */
    int update(Publicinfo publicinfo);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

}

