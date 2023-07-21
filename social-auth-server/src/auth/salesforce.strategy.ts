// src/auth/salesforce.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-oauth2';
import * as jsforce from 'jsforce';
import { Strategy } from 'passport-forcedotcom';


@Injectable()
export class SalesforceStrategy extends PassportStrategy(Strategy, 'forcedotcom') {
  constructor() {
    super({
      clientID: '', // Replace with your Salesforce client ID
      clientSecret: '', // Replace with your Salesforce client secret
      callbackURL: 'http://localhost:3000/auth/salesforce/callback', // Replace with your callback URL
      scope: ['web', 'api' ,'offline_access', 'refresh_token', 'openid', 'email','id'],
      authorizationURL: 'https://login.salesforce.com/services/oauth2/authorize',
      tokenURL: 'https://login.salesforce.com/services/oauth2/token',
    });
  }

  async validate(accessToken: any, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    // Process user profile and perform authentication/authorization
    // You can save the user profile or perform database operations here

    
    var conn = new jsforce.Connection({
        instanceUrl : accessToken.params.instance_url,
        accessToken :accessToken.params.access_token
      });
      

          // Retrieve Account records using the access token
    const accounts = await conn.query("SELECT Id, Name FROM Account");

    console.log('Retrieved Accounts:', accounts.records);


    

    // Create a new data

    const data = {
     Name: 'Injected Data'
     };

   await conn.sobject('Account').create(data, (err, result) => {
  if (err) {
    console.error('Error inserting data:', err);
    return;
  }

  console.log('Data inserted successfully:', result);
   });


   // Update the data

    const updatedData = {
      Name: 'Updated the name', // Replace with the updated value for the FirstName field
    };

    //   Set the record ID you want to update
  const recordId = ''; // Replace with the ID of the record you want to update
  
  // Update the record
  conn.sobject('Account').update({ Id: recordId, ...updatedData }, (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      return;
    }

    console.log('Record updated successfully');
  });

      return done(null, profile);
  }
}
