SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
--SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;


--
-- Name: users; Type: TABLE; Schema: public; 
--

DROP TABLE users;
DROP SEQUENCE users_ids;

CREATE SEQUENCE users_ids START 5;
CREATE TABLE users (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('users_ids'),
  login VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  surname VARCHAR(100),
  name VARCHAR(100),
  patronymic VARCHAR(100),
	money INTEGER
);

COPY users (id, login, password, surname, name, patronymic, money) FROM stdin;
1	admin	12345	-	Администратор системы	-	1000
2	alexso	12345	-	Александр	-	1000
3	friendenotik	12345	Сокольская	Яна	Александровна	1000
\.


--
-- Name: roles; Type: TABLE; Schema: public; 
--

DROP TABLE roles;
DROP SEQUENCE roles_ids;

CREATE SEQUENCE roles_ids;
CREATE TABLE roles (
    id INTEGER PRIMARY KEY DEFAULT NEXTVAL('roles_ids'),
		title VARCHAR(100) NOT NULL
);

COPY roles (title) FROM stdin;
Гость
Пользователь
Администратор
\.


--
-- Name: userrole; Type: TABLE; Schema: public; 
--

DROP TABLE userrole;
DROP SEQUENCE userrole_ids;

CREATE SEQUENCE userrole_ids;
CREATE TABLE userrole (
    id INTEGER PRIMARY KEY DEFAULT NEXTVAL('userrole_ids'),
		user_id integer NOT NULL,
		role_id integer NOT NULL
);

COPY userrole (user_id, role_id) FROM stdin;
1	3
\.

---------------------------------------------------------------------------------------------------------------------------

--
-- Name: zone; Type: TABLE; Schema: public; 
--

DROP TABLE zone;
DROP SEQUENCE zone_ids;

CREATE SEQUENCE zone_ids;
CREATE TABLE zone (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('zone_ids'),
	title VARCHAR(100) NOT NULL,
	gicon VARCHAR(200) NOT NULL
);

COPY zone (title, gicon) FROM stdin;
Elvenar	ground1.jpg
zone 2	ground-texture_(10).jpg
\.


---------------------------------------------------------------------------------------------------------------------------

DROP TABLE skill_kind;
DROP SEQUENCE skill_kind_ids;

--
-- Name: skill_kind; Type: TABLE; Schema: public; 
--

CREATE SEQUENCE skill_kind_ids;
CREATE TABLE skill_kind (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('skill_kind_ids'),
	title VARCHAR(100) NOT NULL,
	gicon VARCHAR(200) DEFAULT NULL
);

COPY skill_kind (id, title) FROM stdin;
1	Движение
2	Плавание
3	Полет
4	Инвентарь
5	резерв
6	Нанять работника
7	Разрушить
8	Торговля
9	Изменение ландшафта
10	резерв
11	Добыча ресурсов
12	резерв
13	резерв
14	Сельское хозяйство
15	резерв
16	Лесоводство
17	Рыболовство
18	охота
19	резерв
20	резерв
21	Строительство
22	разбор на детали
23	Производство
31	обучение
32	лечение
33	торговля
\.


---------------------------------------------------------------------------------------------------------------------------

--
-- Name: entity_type; Type: TABLE; Schema: public; 
--

DROP TABLE entity_type;
DROP SEQUENCE entity_type_ids;

CREATE SEQUENCE entity_type_ids START 1;
CREATE TABLE entity_type (
	id INTEGER PRIMARY KEY DEFAULT NEXTVAL('entity_type_ids'),
	title VARCHAR(100) NOT NULL
);

COPY entity_type (id, title) FROM stdin;
1	земля
2	вода
3	ландшафтные объекты
4	ценность
5	ресурс
6	ресурсосодержащие
7	объект строительства
10	персонаж
11	юнит
\.

---------------------------------------------------------------------------------------------------------------------------

--
-- Name: entity_kind; Type: TABLE; Schema: public; 
--

DROP TABLE entity_kind;
DROP SEQUENCE entity_kind_ids;

CREATE SEQUENCE entity_kind_ids START 1;
CREATE TABLE entity_kind (
	id INTEGER PRIMARY KEY DEFAULT NEXTVAL('entity_kind_ids'),
	title VARCHAR(100) NOT NULL,
	entity_type_id INTEGER NOT NULL,
	options INTEGER DEFAULT NULL,
	sx INTEGER DEFAULT NULL,
	sy INTEGER DEFAULT NULL,
	tilex INTEGER DEFAULT NULL,
	tiley INTEGER DEFAULT NULL,
	gcolor VARCHAR(100) NOT NULL,
	gicon VARCHAR(200) NOT NULL
);

------------------ ландшафт - земля
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (11, 'земля с травой 1', 1, 64, 64, 'blue', 'ground/ALFF01  Moss and Dirt.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (12, 'земля с травой 2', 1, 64, 64, 'blue', 'ground/zel1.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (15, 'песок', 1, 64, 64, 'blue', 'ground/soil-texture02-590x442.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (16, 'глина', 1, 64, 64, 'blue', 'ground/ground1.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (17, 'каменная поверхность', 1, 64, 64, 'blue', 'ground/ground-texture_(10).jpg');
------------------ ландшафт - вода
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (21, 'вода1', 2, 64, 64, 'blue', 'ground/text_water_03.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (22, 'вода2', 2, 64, 64, 'blue', 'ground/oceandday1_sub.jpg');
------------------ ландшафт - дорога
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (31, 'дорога 1', 3, 16, 16, 'blue', 'ground/depositphotos_15791567-stock-photo-asphalt-road-stone-seamless-texture.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (32, 'дорога 2', 3, 16, 16, 'blue', 'ground/no-translate-detected_23-2147625860.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (33, 'дорога 3', 3, 16, 16, 'blue', 'ground/3049460-asphalt-seamless-background.jpg');
------------------ ландшафт - разные окружающие объекты
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (34, 'костер', 3, 48, 48, 'blue', 'ground/blog-0600533001377621525.gif');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (35, 'забор', 3, 42, 42, 'blue', 'ground/farm-fence-icon.png');


------------------ ценности
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (41, 'деньги', 4, 32, 32, 'blue', '200 zlotych monet.png');

------------------ ресурсы и полуфабрикаты
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (51, 'бревно', 5, 32, 32, 'gray', 'ground/Crafting_Item_Log.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (53, 'ветка', 5, 32, 32, 'gray', 'ground/branch-307404_960_720.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (54, 'камень', 5, 32, 32, 'gray', 'ground/Gondor_Rock-0.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (55, 'строительный блок 1', 5, 32, 32, 'gray', 'ground/Gondor_Rock-0.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (56, 'строительный блок 2', 5, 32, 32, 'gray', 'ground/js_img3.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (57, 'доска', 5, 32, 32, 'gray', 'ground/bccf4bce253f11e889522c56dca528e5_bccf4bcf253f11e889522c56dca528e5.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (58, 'пшеница', 5, 32, 32, 'gray', 'ground/png-clipart-computer-icons-wheat-wheat-food-leaf.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (59, 'зерно', 5, 32, 32, 'gray', 'ground/avena_cover.png');

------------------ ресурсосодержащие
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (61, 'ель 1', 6, 48, 80, 'green', 'ground/tree_PNG206.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (62, 'ель 2', 6, 80, 100, 'green', 'ground/christmas-2990482_960_720.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (63, 'ель 3', 6, 100, 120, 'green', 'ground/tree-1702020_960_720.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (64, 'ель 4', 6, 48, 80, 'green', 'ground/tree_PNG206.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (65, 'береза 1', 6, 48, 80, 'green', 'ground/deciduous-tree.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (66, 'береза 2', 6, 48, 80, 'green', 'ground/090631_1385445991.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (67, 'береза 3', 6, 48, 80, 'green', 'ground/tree_PNG3483.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (68, 'дуб 1', 6, 48, 80, 'green', 'ground/0_1543bb_266d2768_orig.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (69, 'дуб 2', 6, 48, 80, 'green', 'ground/7bdc7352c8ab93d86990667e35574ebd.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (70, 'дуб 3', 6, 48, 80, 'green', 'ground/derev42.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (71, 'куст 1', 6, 48, 48, 'green', 'ground/580b585b2edbce24c47b2623.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (72, 'куст 2', 6, 36, 36, 'green', 'ground/bush-png-bush-png-image-1024.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (73, 'куст 3', 6, 42, 42, 'green', 'ground/shrub_png_by_dbszabo1-d368txl.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (81, 'каменный карьер 1', 6, 80, 80, 'gray', 'ground/stone_PNG13581.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (82, 'каменный карьер 2', 6, 80, 80, 'gray', 'ground/95109698_0_b9ef7_22b77649_XL.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (83, 'гора 1', 6, 200, 200, 'gray', 'ground/mountain_PNG6.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (84, 'гора 2', 6, 200, 200, 'gray', 'ground/mountain_PNG29.png');

------------------ персонажи

INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (101, 'гном 1', 10, 48, 48, 'red', 'person/dwarf_PNG57.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (102, 'эльф 1', 10, 48, 48, 'red', 'person/elf_PNG43.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (103, 'орк 1', 10, 48, 48, 'red', 'person/orc_PNG6.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (104, 'крестьянин 1', 10, 48, 48, 'red', 'person/peasant_1.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (105, 'крестьянин 1', 10, 48, 48, 'red', 'person/peasant_4.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (106, 'крестьянин 1', 10, 48, 48, 'red', 'person/peasant_7.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (107, 'рабочий 1', 10, 48, 48, 'red', 'person/worker.png');


INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (110, 'мулл с повозкой', 10, 54, 54, 'red', 'person/kisspng-mule-horse-and-buggy-cart-mule-cart-pull-real-map-5aa2e473439037.3377745615206247552768.png');

------------------ юниты

INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (120, 'волк', 10, 48, 48, 'red', 'animals/4a54eb1e6b3c55bd50ffbbb44330d15b.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (121, 'козел', 10, 48, 48, 'red', 'animals/5-2-700x700.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (122, 'леопард', 10, 48, 48, 'red', 'animals/14071832.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (123, 'лев', 10, 48, 48, 'red', 'animals/75624552_lev.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (124, 'кабан', 10, 48, 48, 'red', 'animals/boar_PNG31483.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (125, 'лиса', 10, 48, 48, 'red', 'animals/hello_html_738dd0e8.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (126, 'медведь', 10, 48, 48, 'red', 'animals/дикие-животные-png-.png');

------------------ объекты строительства

INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (150, 'жилой дом 1', 7, 100, 100, 'white', 'buildings/house_1.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (151, 'жилой дом 2', 7, 140, 140, 'white', 'buildings/house_2.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (152, 'таверна', 7, 100, 100, 'white', 'buildings/3.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (153, 'таверна', 7, 100, 100, 'white', 'buildings/200px-Tavern_lvl_6-10.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (154, 'таверна', 7, 100, 100, 'white', 'buildings/таверна-png-.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (155, 'замок 1', 7, 100, 100, 'white', 'buildings/artage-io-thumb-53acd98bac567facfc0e8273aa51677a.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (156, 'замок 2', 7, 100, 100, 'white', 'buildings/castle-1096474_960_720.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (157, 'замок 3', 7, 100, 100, 'white', 'buildings/Main_Keep_DE.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (158, 'особняк 1', 7, 100, 100, 'white', 'buildings/house_PNG64.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (159, 'охотничья сторожка', 7, 100, 100, 'white', 'buildings/hut.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (160, 'мельница 1', 7, 100, 100, 'white', 'buildings/cd744cf98ef7eca0a2964e00b1faf1b4.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (161, 'железный рудник', 7, 100, 100, 'white', 'buildings/b_mine_coal[3_0].png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (162, 'золотой рудник', 7, 100, 100, 'white', 'buildings/Gold_mine.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (163, 'лесопилка 1', 7, 100, 100, 'white', 'buildings/G_SS_BronzeAge_Lumbermill.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (164, 'лесопилка 2', 7, 100, 100, 'white', 'buildings/g5-ltr.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (165, 'лесопилка 3', 7, 100, 100, 'white', 'buildings/lesopilka.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (166, 'торговый центр', 7, 100, 100, 'white', 'buildings/workshop.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (167, 'завод по производству каменных блоков', 7, 100, 100, 'white', 'buildings/obnovafarova.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (168, 'завод бетонных блоков', 7, 100, 100, 'white', 'buildings/zavod.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (169, 'склад', 7, 100, 100, 'white', 'buildings/w256h2561350823237production256x256.png');
INSERT INTO entity_kind (id, title, entity_type_id, tilex, tiley, gcolor, gicon)
	VALUES (170, 'грядка 1', 7, 32, 32, 'white', 'ground/Chernozem.jpg');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (171, 'магический центр', 7, 100, 100, 'white', 'buildings/magmatite_mine.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (172, 'конюшня', 7, 100, 100, 'white', 'buildings/Конюшня.png');
INSERT INTO entity_kind (id, title, entity_type_id, sx, sy, gcolor, gicon)
	VALUES (173, 'стрельбище лучников', 7, 100, 100, 'white', 'buildings/Стрельбище_лучников.png');


ALTER SEQUENCE entity_kind_ids RESTART WITH 300;

---------------------------------------------------------------------------------------------------------------------------

DROP TABLE entity_skill;
DROP SEQUENCE gen_entity_skill;

--
-- Name: entity_skill; Type: TABLE; Schema: public; 
--
-- usecase: 1 - allowed (может совершить), 2 - applied (можно применить к), 3 - both

CREATE SEQUENCE gen_entity_skill;
CREATE TABLE entity_skill (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('gen_entity_skill'),
	entity_kind_id integer NOT NULL,
	skill_kind_id integer NOT NULL,
	usecase integer DEFAULT 1,
	requirements integer DEFAULT NULL
);

COPY entity_skill (entity_kind_id, skill_kind_id, usecase) FROM stdin;
11	1	2
11	14	2
11	16	2
11	21	2
12	1	2
12	14	2
12	16	2
12	21	2
13	1	2
13	16	2
13	21	2
14	1	2
14	16	2
14	21	2
15	1	2
15	21	2
16	1	2
16	21	2
17	1	2
17	21	2
21	2	2
22	2	2
31	1	2
32	1	2
33	1	2
41	4	2
51	4	2
52	4	2
53	4	2
54	4	2
55	4	2
56	4	2
57	4	2
58	14	2
59	4	2
61	11	2
62	11	2
63	11	2
81	11	2
82	11	2
83	11	2
84	11	2
101	1	1
101	4	1
101	6	1
101	7	1
101	8	1
101	9	1
101	21	1
101	23	1
102	1	1
102	4	1
102	8	1
102	14	1
102	16	1
103	1	1
104	1	1
104	4	1
104	11	1
105	1	1
105	4	1
105	11	1
110	1	1
150	7	2
150	8	2
151	7	2
151	8	2
152	6	2
152	7	2
152	8	2
153	7	2
153	8	2
154	7	2
154	8	2
155	7	2
155	8	2
156	7	2
156	8	2
157	7	2
157	8	2
158	7	2
158	8	2
159	7	2
159	8	2
160	7	2
160	16	2
163	7	2
163	23	2
164	7	2
164	23	2
165	23	2
170	7	2
170	23	2
\.

---------------------------------------------------------------------------------------------------------------------------

DROP TABLE entity_technology_process;
DROP SEQUENCE gen_entity_technology_process_id;

--
-- Name: entity_action; Type: TABLE; Schema: public; 
--

CREATE SEQUENCE gen_entity_technology_process_id;
CREATE TABLE entity_technology_process (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('gen_entity_technology_process_id'),
	entity_kind_id integer NOT NULL,
	technology_process_id integer NOT NULL
);

COPY entity_technology_process (entity_kind_id, technology_process_id) FROM stdin;
61	11
62	12
63	11
63	12
81	15
81	16
82	15
82	16
101	1
101	150
101	151
101	152
101	153
101	154
102	71
102	72
102	73
102	200
102	201
104	150
104	151
104	152
150	7
151	7
152	5
152	6
152	7
153	6
153	7
154	6
154	7
155	7
156	7
157	7
158	7
159	7
163	220
164	220
164	221
170	7
\.

---------------------------------------------------------------------------------------------------------------------------

DROP TABLE technology_process;
DROP SEQUENCE gen_technology_process;

--
-- Name: technology; Type: TABLE; Schema: public; 
--
-- options:
-- 1 - автостартующий процесс, при появлении требуемых gok
-- 2 - процесс, выполняющийся один цикл, удаляющий объекта, выбрасывающий созданные gok наружу
-- 3 - процесс, выполняет циклы, до тех пор пока требуемые gok есть в наличии, как только они заканчиваются, объект удаляется
-- 4 - строительство, списывает spended и создает produced_ek1_id на первом этапе

CREATE SEQUENCE gen_technology_process;
CREATE TABLE technology_process (
	id INTEGER PRIMARY KEY DEFAULT NEXTVAL('gen_technology_process'),
	title VARCHAR(100) DEFAULT NULL,
	skill_kind_id integer NOT NULL,
	executor_duration integer DEFAULT 0,
	duration integer DEFAULT 0,
	primecost integer DEFAULT 0,
	options integer DEFAULT 0,
	produced_ek1_id integer DEFAULT NULL,
	produced_ek1_count integer DEFAULT 1,
	produced_ek2_id integer DEFAULT NULL,
	produced_ek2_count integer DEFAULT NULL,
	spended_ek1_id integer DEFAULT NULL,
	spended_ek1_count integer DEFAULT NULL,
	spended_ek2_id integer DEFAULT NULL,
	spended_ek2_count integer DEFAULT NULL,
	spended_ek3_id integer DEFAULT NULL,
	spended_ek3_count integer DEFAULT NULL,
	spended_ek4_id integer DEFAULT NULL,
	spended_ek4_count integer DEFAULT NULL,
	spended_ek5_id integer DEFAULT NULL,
	spended_ek5_count integer DEFAULT NULL
);

------------------ движение

INSERT INTO technology_process (id, skill_kind_id)
	VALUES (1, 1);

------------------ нанять

INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, options, produced_ek1_id)
	VALUES (5, 'Нанять работника', 6, 1000*30*1, 0, 104);
INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, options, produced_ek1_id)
	VALUES (6, 'Нанять работника', 6, 1000*30*1, 0, 105);

------------------ разрушить

INSERT INTO technology_process (id, skill_kind_id, executor_duration, options)
	VALUES (7, 7, 1000*30*1, 2);

------------------ добыча ресурсов

INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, options, produced_ek1_id)
	VALUES (11, 'Добыча древесины', 11, 1000*60*1, 2, 51);
INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, options, produced_ek1_id, produced_ek1_count)
	VALUES (12, 'Добыча древесины', 11, 1000*60*2, 2, 51, 3);

INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, options, produced_ek1_id)
	VALUES (15, 'Добыча камня', 11, 1000*60*1, 2, 54);
INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, options, produced_ek1_id, produced_ek1_count)
	VALUES (16, 'Добыча камня', 11, 1000*60*2, 2, 54, 3);

------------------ сельское хозяйство


INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, duration, produced_ek1_id, spended_ek1_id, spended_ek1_count)
	VALUES (200, 'Выращивание зерна', 14, 1000*60*2, 1000*60*60*1, 58, 41, 1000);

INSERT INTO technology_process (id, title, skill_kind_id, executor_duration, duration, options, produced_ek1_id, spended_ek1_id, spended_ek1_count)
	VALUES (201, 'Разработка грядки', 14, 1000*60*2, 1000*60*60*1, 4, 170, 41, 1000);

------------------ посадка ландшафтных растений на земле
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, spended_ek1_id, spended_ek1_count)
	VALUES (71, 16, 1000*30, 1000*60*20, 4, 61, 41, 700);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, spended_ek1_id, spended_ek1_count)
	VALUES (72, 16, 1000*30, 1000*60*20, 4, 62, 41, 700);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, spended_ek1_id, spended_ek1_count)
	VALUES (73, 16, 1000*30, 1000*60*20, 4, 63, 41, 700);

------------------ строительство
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (150, 21, 1000*10, 1000*60*10, 4, 150, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (151, 21, 1000*10, 1000*60*10, 4, 151, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (152, 21, 1000*10, 1000*60*10, 4, 152, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (153, 21, 1000*10, 1000*60*10, 4, 153, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (154, 21, 1000*10, 1000*60*10, 4, 154, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (155, 21, 1000*10, 1000*60*10, 4, 155, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (156, 21, 1000*10, 1000*60*10, 4, 156, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (157, 21, 1000*10, 1000*60*10, 4, 157, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (158, 21, 1000*10, 1000*60*10, 4, 158, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (159, 21, 1000*10, 1000*60*10, 4, 159, 1, 41, 1000);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, options, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count)
	VALUES (160, 21, 1000*10, 1000*60*10, 4, 160, 1, 41, 1000);


------------------ производство

INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count, spended_ek2_id, spended_ek2_count)
	VALUES (220, 23, 1000*10, 1000*60*5, 57, 5, 41, 500, 51, 1);
INSERT INTO technology_process (id, skill_kind_id, executor_duration, duration, produced_ek1_id, produced_ek1_count, spended_ek1_id, spended_ek1_count, spended_ek2_id, spended_ek2_count)
	VALUES (221, 23, 1000*20, 1000*60*10, 57, 7, 41, 700, 51, 2);


---------------------------------------------------------------------------------------------------------------------------

DROP TABLE entity;
DROP SEQUENCE gen_entity_id;
--
-- Name: entity; Type: TABLE; Schema: public; 
--
-- state: 0 - live, 1 - ghost

CREATE SEQUENCE gen_entity_id;
CREATE TABLE entity (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('gen_entity_id'),
	title VARCHAR(100) DEFAULT NULL,
	zone_id integer DEFAULT 1,
	user_id INTEGER DEFAULT NULL,
	parent_id INTEGER DEFAULT NULL,
	entity_kind_id integer NOT NULL,
	count INTEGER DEFAULT 0,
	state integer DEFAULT 0,
	xx integer NOT NULL,
	yy integer NOT NULL,
	x2 integer DEFAULT 0,
	y2 integer DEFAULT 0,
	alpha integer DEFAULT 0
);

------------------ ландшафт
INSERT INTO entity (id, entity_kind_id, xx, yy, x2, y2) VALUES (1, 11, -1000, -1000, 1000, 1000);
INSERT INTO entity (id, entity_kind_id, xx, yy, x2, y2) VALUES (2, 12, 1000, -1000, 2000, 2000);
INSERT INTO entity (id, entity_kind_id, xx, yy, x2, y2) VALUES (3, 21, -500, 300, 100, 500);

INSERT INTO entity (id, entity_kind_id, xx, yy, x2, y2) VALUES (4, 31, -1000, 100, 1500, 130);

INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (14, 150, 0, 0);
INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (15, 151, 100, 0);
INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (16, 152, 200, 0);
INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (17, 153, 300, 0);
INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (18, 154, 400, 0);

------------------ производства
INSERT INTO entity (id, entity_kind_id, xx, yy, x2, y2) VALUES (19, 170, 100, 300, 600, 400); -- грядка
INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (20, 163, -200, 0);
INSERT INTO entity (id, entity_kind_id, xx, yy) VALUES (21, 164, -400, 0);

------------------ персонажи
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (41, 101, 'ДЖАРФРИ', 1, 100, 100); -- гном
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (42, 102, 'ТРИГОРД', 2, 200, 200); -- эльф
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (43, 103, 'ТЕНГОН', 3, 300, 300); -- орк
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (44, 104, 'крестьянин', 1, 200, 100); -- крестьянин
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (45, 105, 'крестьянин', 2, 300, 200); -- крестьянин
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (46, 106, 'крестьянин', 0, 400, 300); -- крестьянин
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (47, 107, 'рабочий', 0, 600, 300); -- рабочий
INSERT INTO entity (id, entity_kind_id, title, user_id, xx, yy) VALUES (48, 110, 'УВГИНД', 0, 500, 300); -- мулл с повозкой

------------------ ресурсосодержащие

ALTER SEQUENCE gen_entity_id RESTART WITH 100;

------------------ ресурсы
INSERT INTO entity (entity_kind_id, count, xx, yy) VALUES (41, 100, 300, 100);		
INSERT INTO entity (entity_kind_id, count, xx, yy) VALUES (51, 10, 300, 150);		
INSERT INTO entity (entity_kind_id, count, xx, yy) VALUES (52, 15, 350, 100);		
INSERT INTO entity (entity_kind_id, count, xx, yy) VALUES (53, 20, 350, 150);		
INSERT INTO entity (entity_kind_id, count, xx, yy) VALUES (54, 25, 400, 100);		
INSERT INTO entity (entity_kind_id, count, xx, yy) VALUES (55, 30, 400, 150);		

-- лес
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (61, -250, -100);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (62, -150, -100);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (63, -50, -100);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (63, -250, -200);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (62, -150, -200);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (61, -50, -200);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (62, -250, -300);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (63, -150, -300);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (61, -50, -300);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (63, -250, -400);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (61, -150, -400);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (62, -50, -400);
--
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (81, 250, -100);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (82, 250, -200);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (83, 450, -300);
INSERT INTO entity (entity_kind_id, xx, yy) VALUES (84, 250, -400);



---------------------------------------------------------------------------------------------------------------------------

DROP TABLE task;
DROP SEQUENCE gen_task_id;

--
-- Name: task; Type: TABLE; Schema: public; 
--

CREATE SEQUENCE gen_task_id;
CREATE TABLE task (
  id INTEGER PRIMARY KEY DEFAULT NEXTVAL('gen_task_id'),
	skill_kind_id INTEGER NOT NULL,
	entity_id INTEGER NOT NULL,
	target_entity_id INTEGER NOT NULL,
	target_xx INTEGER DEFAULT NULL,
	target_yy INTEGER DEFAULT NULL,
	technology_process_id INTEGER DEFAULT NULL,
	technology_process_state INTEGER DEFAULT NULL,
	showing INTEGER DEFAULT 1,
	complete_type INTEGER DEFAULT 0,
	starttime timestamp NOT NULL,
	duration INTEGER DEFAULT 0,
	lefttime INTEGER DEFAULT 0
);
--INSERT INTO task (entity_id, skill_kind_id) VALUES (41, 1);
--INSERT INTO task (entity_id, skill_kind_id) VALUES (41, 12);
--INSERT INTO task (entity_id, skill_kind_id) VALUES (42, 1);


