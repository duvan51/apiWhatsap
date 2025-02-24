
const UserModel = (sequelize, DataTypes) =>{
  const User = sequelize.define('User', {
    // Definición de columnas
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  Name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  
  whattsap:{
      type: DataTypes.STRING,
      allowNull: true
  },
  email:{
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true,
    validate:{
        isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: true, // Se eliminará cuando se conecte
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING", // PENDING: Esperando escaneo, CONNECTED: Conectado
  },
  sessionData: {
    type: DataTypes.TEXT, // Opcional: Para guardar datos de sesión
    allowNull: true,
  }

  },
  {
      tableName: 'User', // Especifica el nombre de la tabla existente
      timestamps: false // Si no quieres createdAt y updatedAt

  });

  return User;
};
export default UserModel;