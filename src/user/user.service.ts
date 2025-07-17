import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async get() {
    try {
      // 发送请求并等待响应
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );

      // 检查 HTTP 状态码
      if (!response.ok) {
        throw new Error(`HTTP 错误，状态码: ${response.status}`);
      }

      // 解析 JSON 数据并等待结果
      const users = await response.json();

      // 处理数据
      console.log('用户数据:', users);
      return users; // 可选：返回数据供其他函数使用
    } catch (error) {
      // 错误处理
      console.error('获取用户数据失败:', error);
      throw error; // 将错误继续抛出，由调用者处理
    }
  }
}
