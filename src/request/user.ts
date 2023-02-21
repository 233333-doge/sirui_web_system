import service from "@/request/index";
// 创建子用户
export function addUserAPI(data: any) {
  return service({
    url: `/api/admin/user/register`,
    method: "POST",
    data,
  });
}
// 获取子用户列表
export function getUserListAPI(data: any) {
  return service({
    url: `/api/admin/user/sub?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: "GET",
  });
}

// 修改用户密码
export function editUserAPI(id: number, data: any) {
  return service({
    url: `/api/admin/user/sub/${id}`,
    method: "PUT",
    data: {
      password: data.password,
      username: data.username,
    },
  });
}
// 删除子用户
export function deleteUserAPI(id: number) {
  return service({
    url: `/api/admin/user/sub/${id}`,
    method: "DELETE",
  });
}
// 共享给子用户
export function sharePlaceAPI(projectId: string, userId: string) {
  return service({
    url: `/api/admin/project/share/${projectId}/${userId}`,
    method: "POST",
  });
}
// 取消共享给子用户
export function cancleSharePlaceAPI(projectId: string, userId: string) {
  return service({
    url: `/api/admin/project/share/${projectId}/${userId}`,
    method: "Delete",
  });
}
// 通过用户查询场地列表
export function getPlacesByUserIdAPI(userId: string, data: any) {
  return service({
    url: `/api/admin/project/subuser/${userId}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: "GET",
  });
}
