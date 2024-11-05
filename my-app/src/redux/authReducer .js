import AsyncStorage from '@react-native-async-storage/async-storage';

// Khởi tạo state cho auth
export const initialAuthState = {
  token: null,
  user: {
    id:null,
    fullName: null,
    email: null,
    role: null,
    dob:null,
    phone: null,
    address: null,
    avatar: null,
    status:null,

    // Thêm các trường khác nếu cần
  },
};

const saveAuthState = async (state) => {
  try {
    await AsyncStorage.setItem('authState', JSON.stringify(state));
  } catch (err) {
    console.error('Error saving auth state:', err);
  }
};

// Định nghĩa authReducer
export const authReducer = (state = initialAuthState, action) => {
  let newState;

  switch (action.type) {
    case 'SET_TOKEN':
      newState = {
        ...state,
        token: action.payload.token, // Lưu token
        user: {
          ...state.user, // Giữ nguyên thông tin người dùng hiện tại
          ...action.payload.user, // Cập nhật thông tin người dùng mới từ payload
        },
      };
      break;

    case 'REMOVE_TOKEN':
      newState = {
        ...state,
        token: null,
        user: initialAuthState.user, // Đặt lại thông tin người dùng về mặc định
      };
      break;

    default:
      return state;
  }

  // Lưu vào AsyncStorage sau mỗi lần thay đổi
  saveAuthState(newState);
  return newState;
};
