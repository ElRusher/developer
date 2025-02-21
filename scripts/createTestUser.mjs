import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/models/user.model.mjs';

dotenv.config();

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Remover usuário existente
    await User.deleteOne({ username: 'testuser' });

    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const user = new User({
      username: 'testuser',
      password: hashedPassword,
      role: 'user',
    });

    await user.save();
    console.log('Test user created successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error creating test user:', err);
    mongoose.connection.close();
  }
})();