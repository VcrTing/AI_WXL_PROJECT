const jwt_expire = (token: string) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    const now = Math.floor(Date.now() / 1000);
    // console.log('exp =', exp, ' now =', now, now >= (exp - 30), times.fmts(exp), times.fmts(now))
    // 提前 30 秒视为过期，避免临界情况
    return now >= (exp - 30);
  } 
  catch (error) {
    return true;
  }
}

export default {
    jwt_expire
}