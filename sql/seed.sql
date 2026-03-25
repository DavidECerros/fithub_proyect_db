-- =========================================
-- 1. CENTROS
-- =========================================
INSERT INTO public.centro_deportivo (id_centro, nombre, direccion, telefono, email) VALUES
(1, 'FitHub Centro', 'Tegucigalpa', '22341001', 'centro@fithub.com'),
(2, 'FitHub Norte', 'San Pedro Sula', '22341002', 'norte@fithub.com');

-- =========================================
-- 2. PERSONAS
-- =========================================
INSERT INTO public.persona (id_persona, nombre1, apellido1, apellido2, email, password, tipo) VALUES
(1, 'Carlos', 'Mejia', 'Lopez', 'carlos@fithub.com', '123', 'cliente'),
(2, 'Ana', 'Lopez', 'Martinez', 'ana@fithub.com', '123', 'cliente'),
(3, 'Luis', 'Pineda', 'Castro', 'luis@fithub.com', '123', 'cliente'),
(4, 'Maria', 'Reyes', 'Gomez', 'maria@fithub.com', '123', 'cliente'),
(5, 'Jose', 'Ramirez', 'Diaz', 'jose@fithub.com', '123', 'cliente'),
(6, 'Elena', 'Torres', 'Mora', 'elena@fithub.com', '123', 'cliente'),
(7, 'Pedro', 'Santos', 'Lopez', 'pedro@fithub.com', '123', 'empleado'),
(8, 'Laura', 'Gomez', 'Perez', 'laura@fithub.com', '123', 'empleado'),
(9, 'Diego', 'Flores', 'Vega', 'diego@fithub.com', '123', 'empleado'),
(10, 'Rosa', 'Castillo', 'Nunez', 'rosa@fithub.com', '123', 'cliente'),
(11, 'Mario', 'Cruz', 'Alvarado', 'mario@fithub.com', '123', 'cliente'),
(12, 'Sofia', 'Molina', 'Paz', 'sofia@fithub.com', '123', 'cliente');

-- =========================================
-- 3. CLIENTES
-- =========================================
INSERT INTO public.cliente (id_persona, fecha_registro) VALUES
(1, '2026-03-01'),
(2, '2026-03-02'),
(3, '2026-03-03'),
(4, '2026-03-04'),
(5, '2026-03-05'),
(6, '2026-03-06'),
(10, '2026-03-07'),
(11, '2026-03-08'),
(12, '2026-03-09');

-- =========================================
-- 4. EMPLEADOS
-- =========================================
INSERT INTO public.empleado (id_persona, cargo, salario, id_centro) VALUES
(7, 'Entrenador', 18000, 1),
(8, 'Entrenadora', 18500, 1),
(9, 'Administrador', 22000, 2);

-- =========================================
-- 5. TELEFONOS
-- =========================================
INSERT INTO public.telefono_persona (id_telefono, id_persona, telefono) VALUES
(1,1,'99990001'),
(2,2,'99990002'),
(3,3,'99990003'),
(4,4,'99990004'),
(5,5,'99990005'),
(6,6,'99990006'),
(7,7,'98880001'),
(8,8,'98880002'),
(9,9,'98880003'),
(10,10,'99990007'),
(11,11,'99990008'),
(12,12,'99990009');

-- =========================================
-- 6. ACTIVIDADES
-- =========================================
INSERT INTO public.actividad (id_actividad, nombre, descripcion, cupo_maximo, horario, id_centro) VALUES
(1,'Yoga','Relajacion',20,'Lunes 8AM',1),
(2,'Spinning','Cardio',15,'Martes 6PM',1),
(3,'Crossfit','Alta intensidad',12,'Miercoles 5PM',2),
(4,'Zumba','Baile fitness',25,'Sabado 9AM',2);

-- =========================================
-- 7. IMPARTE
-- =========================================
INSERT INTO public.imparte (id_empleado, id_actividad) VALUES
(7,1),
(8,2),
(7,3),
(8,4);

-- =========================================
-- 8. MEMBRESIAS
-- =========================================
INSERT INTO public.membresia (id_membresia, id_cliente, tipo, fecha_inicio, fecha_fin, estado) VALUES
(1,1,'mensual','2026-03-01','2026-03-31','activa'),
(2,2,'trimestral','2026-03-02','2026-06-02','activa'),
(3,3,'anual','2026-03-03','2027-03-03','activa'),
(4,4,'mensual','2026-02-01','2026-02-28','vencida'),
(5,5,'mensual','2026-03-05','2026-04-05','activa'),
(6,6,'trimestral','2026-01-10','2026-04-10','cancelada'),
(7,10,'mensual','2026-03-07','2026-04-07','activa'),
(8,11,'mensual','2026-03-08','2026-04-08','activa'),
(9,12,'trimestral','2026-03-09','2026-06-09','activa');

-- =========================================
-- 9. RESERVAS
-- =========================================
INSERT INTO public.reserva (id_reserva, id_cliente, id_actividad, fecha, estado) VALUES
(1,1,1,'2026-03-10','confirmada'),
(2,2,1,'2026-03-10','confirmada'),
(3,3,2,'2026-03-11','pendiente'),
(4,4,3,'2026-03-11','cancelada'),
(5,5,4,'2026-03-12','confirmada'),
(6,6,2,'2026-03-12','pendiente'),
(7,10,1,'2026-03-13','confirmada'),
(8,11,3,'2026-03-13','pendiente'),
(9,12,4,'2026-03-14','confirmada'),
(10,1,2,'2026-03-14','confirmada');

-- =========================================
-- 10. PAGOS
-- =========================================
INSERT INTO public.pago (id_reserva, num_pago, monto, metodo_pago, fecha_pago) VALUES
(1,1,300,'tarjeta','2026-03-10'),
(2,2,300,'efectivo','2026-03-10'),
(3,3,350,'transferencia','2026-03-11'),
(5,4,280,'tarjeta','2026-03-12'),
(7,5,300,'efectivo','2026-03-13'),
(9,6,320,'tarjeta','2026-03-14');