import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";


@Controller('/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('/get-users')
    async getUsers() {
        const data = await this.adminService.getUsers()
        return {
            message: 'Lấy danh sách user thành công',
            success: true,
            data: data
        };
    }
}