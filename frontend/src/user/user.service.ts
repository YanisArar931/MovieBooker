import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly jwtService: JwtService
      ) {}

  async register(username: string, email: string, password: string) {

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Cet email est déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new this.userModel({ username, email, password: hashedPassword });
    await newUser.save();

    const payload = { id: newUser._id, email: newUser.email };
    const token = this.jwtService.sign(payload);

    return { message: 'Utilisateur créé avec succès.',
      access_token: token, 
    };
  }

  // async register(username: string, email: string, password: string) {
  //   // 🔍 Vérifier si l'utilisateur existe déjà
  //   const existingUser = await this.userModel.findOne({ email }).exec();
  //   if (existingUser) {
  //     throw new ConflictException('Cet email est déjà utilisé.');
  //   }

  //   // 🔐 Hasher le mot de passe
  //   const hashedPassword = await bcrypt.hash(password, 10);
    
  //   // ✅ Créer et sauvegarder l'utilisateur
  //   const newUser = new this.userModel({ username, email, password: hashedPassword });
  //   await newUser.save();

  //   // 🔑 Générer un token JWT
  //   const payload = { id: newUser._id, email: newUser.email };
  //   const token = this.jwtService.sign(payload);

  //   return {
  //     message: 'Utilisateur créé avec succès.',
  //     access_token: token, // ✅ Retourne aussi le JWT
  //   };
  // }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }
  
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { access_token: token };
  }  

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}