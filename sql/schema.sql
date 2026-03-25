-- =============================================
-- FITHUB - schema.sql
-- Autor: David Enrique Cerros Lopez
-- =============================================

CREATE TABLE persona (
  id_persona  SERIAL PRIMARY KEY,
  nombre1     VARCHAR(50)  NOT NULL,
  apellido1   VARCHAR(50)  NOT NULL,
  apellido2   VARCHAR(50),
  email       VARCHAR(100) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  tipo        VARCHAR(20)  NOT NULL DEFAULT 'cliente' CHECK (tipo IN ('cliente', 'empleado'))
);

CREATE TABLE telefono_persona (
  id_telefono SERIAL PRIMARY KEY,
  id_persona  INT NOT NULL REFERENCES persona(id_persona) ON DELETE CASCADE,
  telefono    VARCHAR(20) NOT NULL
);

CREATE TABLE centro_deportivo (
  id_centro   SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  direccion   VARCHAR(200) NOT NULL,
  telefono    VARCHAR(20),
  email       VARCHAR(100) UNIQUE
);

CREATE TABLE cliente (
  id_persona  INT PRIMARY KEY REFERENCES persona(id_persona) ON DELETE CASCADE,
  fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE empleado (
  id_persona  INT PRIMARY KEY REFERENCES persona(id_persona) ON DELETE CASCADE,
  cargo       VARCHAR(100) NOT NULL,
  salario     NUMERIC(10,2) NOT NULL CHECK (salario > 0),
  id_centro   INT NOT NULL REFERENCES centro_deportivo(id_centro)
);

CREATE TABLE membresia (
  id_membresia SERIAL PRIMARY KEY,
  id_cliente   INT NOT NULL REFERENCES cliente(id_persona) ON DELETE CASCADE,
  tipo         VARCHAR(50) NOT NULL CHECK (tipo IN ('mensual', 'trimestral', 'anual')),
  fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_fin    DATE NOT NULL,
  estado       VARCHAR(20) NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa', 'vencida', 'cancelada')),
  CHECK (fecha_fin > fecha_inicio)
);

CREATE TABLE actividad (
  id_actividad SERIAL PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL,
  descripcion  TEXT,
  cupo_maximo  INT NOT NULL CHECK (cupo_maximo > 0),
  horario      VARCHAR(100) NOT NULL,
  id_centro    INT NOT NULL REFERENCES centro_deportivo(id_centro)
);

CREATE TABLE imparte (
  id_empleado  INT NOT NULL REFERENCES empleado(id_persona) ON DELETE CASCADE,
  id_actividad INT NOT NULL REFERENCES actividad(id_actividad) ON DELETE CASCADE,
  PRIMARY KEY (id_empleado, id_actividad)
);

CREATE TABLE reserva (
  id_reserva   SERIAL PRIMARY KEY,
  id_cliente   INT NOT NULL REFERENCES cliente(id_persona) ON DELETE CASCADE,
  id_actividad INT NOT NULL REFERENCES actividad(id_actividad) ON DELETE CASCADE,
  fecha        DATE NOT NULL DEFAULT CURRENT_DATE,
  estado       VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  UNIQUE (id_cliente, id_actividad, fecha)
);

CREATE TABLE pago (
  id_reserva   INT NOT NULL REFERENCES reserva(id_reserva) ON DELETE CASCADE,
  num_pago     SERIAL,
  monto        NUMERIC(10,2) NOT NULL CHECK (monto > 0),
  metodo_pago  VARCHAR(50) NOT NULL CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'transferencia')),
  fecha_pago   DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (id_reserva, num_pago)
);
