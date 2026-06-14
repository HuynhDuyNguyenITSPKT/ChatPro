import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AuthModule } from "../auth/auth.module";


@Module({
    providers: [AdminService],
    exports: [AdminService],
    imports: [AuthModule],
    controllers: [AdminController]
})
export class AdminModule { }
