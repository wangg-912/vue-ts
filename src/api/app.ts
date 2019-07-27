import $axios from '@/utils/axios.request';
/**
 * 总系统角色菜单 | 根据用户ID获取所属角色的菜单
 * @param userId 用户id
 */
export const getUseInfo = (userId : any) => {
    return $axios.request({url: `/xxx/${userId}`, method: 'get'});
};
export const updateUser = (data : object) => {
    return $axios.request({url: '/123', data: data, method: 'post'});
};
export const getUsers = (options : any) => {

    return $axios.request({
        url: '/123',
        method: 'get',
        params: {
            name: options['name'],
            age: options['age'],
            address: options['address']
        }
    });
};