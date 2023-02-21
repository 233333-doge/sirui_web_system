import service from "@/request/index";
// 获取场地列表
export function getPlaceListAPI(data: any) {
  return service({
    url: `/api/admin/project/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: "GET",
  });
}
// 新增场地
export function addPlaceAPI(data: any) {
  return service({
    url: `/api/admin/project`,
    method: "POST",
    data: {
      ...data,
      price: +data.price * 100,
    },
  });
}
// 删除场地
export function deletePlaceAPI(id: string) {
  return service({
    url: `/api/admin/project/${id}`,
    method: "DELETE",
  });
}
// 修改场地价格
export function editPriceAPI(projectId: string, price: string) {
  return service({
    url: `/api/admin/price/${projectId}/${price}`,
    method: "POST",
  });
}
// 修改场地名称
export function editNameAPI(projectId: string, name: string) {
  return service({
    url: `/api/admin/project/${projectId}?name=${name}`,
    method: "PUT",
  });
}
