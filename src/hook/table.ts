import { cancleSharePlaceAPI } from "@/request/user";
import { ElMessageBox, ElMessage } from "element-plus";
export async function deletePlaceHook(row: any, userId: string) {
  return ElMessageBox.confirm("是否删除该场地?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await cancleSharePlaceAPI(row.id, userId);
      if ((res as any).success) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
}
