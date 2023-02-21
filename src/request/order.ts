import service from "@/request/index";
// 获取订单列表
export function getOrderListAPI(data: any) {
  return service({
    url: `/api/admin/order?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method: "GET",
  });
}
