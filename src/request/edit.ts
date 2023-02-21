import service from "@/request/index";

// 获取当前价格(每半小时)
export function getPriceAPI() {
  return service({
    url: `/api/admin/price`,
    method: "GET",
  });
}

// 修改价格
export function editPriceAPI(price: string) {
  return service({
    url: `/api/admin/price/${price}`,
    method: "POST",
  });
}
