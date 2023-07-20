// auth/auth.controller.ts

import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    @Get('salesforce')
    @UseGuards(AuthGuard('forcedotcom'))
    salesforceLogin(@Req() req: Request) {
      console.log('Salesforce Login:', req.user);
    }
    

  @Get('salesforce/callback')
  @UseGuards(AuthGuard('forcedotcom'))
  salesforceCallback(@Req() req: Request, @Res() res: Response) {
    // Redirect to the profile page or handle the successful login
    res.redirect('/profile');
  }
}
