import service from "@/request/index";
import { ILoginData } from "@/type/login";

// 登录接口
export function login(data: ILoginData) {
  return service({
    url: `/api/admin/user/login`,
    method: "POST",
    data,
  });
}
