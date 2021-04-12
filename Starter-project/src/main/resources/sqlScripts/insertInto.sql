
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (1, 'Nike', 'Save Kovačevića 15', '+38165324311');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (2, 'Adidas', 'Sonje Marinković 13', '+38162345721');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (3, 'New Balance', 'Bulevar cara Lazara 6', '+38164980031');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (4, 'Puma', 'Bulevar oslobodjenja 21', '+38162667312');
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (5, 'Umbro', 'Kosovska 11', '+38163732411');

INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (1, 1, 'Patike');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (2, 4, 'Trenerka');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (3, 2, 'Kopačke');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (4, 5, 'Majica');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (5, 3, 'Jakna');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (6, 1, 'Ranac');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (7, 5, 'Sportska tašna');
INSERT INTO "proizvod"("id", "proizvodjac", "naziv")
VALUES (8, 2, 'Flašica za vodu');

INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (1, to_date('01.03.2020.', 'dd.mm.yyyy.'),  'kartica');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (2, to_date('24.03.2020.', 'dd.mm.yyyy.'),  'gotovina');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (3, to_date('11.01.2020.', 'dd.mm.yyyy.'),  'gotovina');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (4, to_date('21.10.2019.', 'dd.mm.yyyy.'),  'kartica');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (5, to_date('17.7.2019.', 'dd.mm.yyyy.'),  'gotovina');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (6, to_date('12.02.2020.', 'dd.mm.yyyy.'),  'gotovina');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (7, to_date('04.09.2019.', 'dd.mm.yyyy.'),  'kartica');

INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (1, 2, 2, 'komad', '7400', 2, 1);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (2, 1, 2, 'komad', '11000', 2, 2);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (3, 1, 1, 'komad', '3700', 3, 1);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (4, 1, 2, 'komad', '2100', 1, 5);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (5, 3, 2, 'komad', '9000', 2, 4);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (6, 2, 1, 'komad', '5500', 1, 2);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (7, 1, 2, 'komad', '4200', 7, 8);
INSERT INTO "stavka_racuna"("id", "redni_broj", "kolicina", "jedinica_mere", "cena", "racun", "proizvod")
VALUES (8, 1, 1, 'komad', '4800', 6, 7);

INSERT INTO "proizvod"("id", "naziv", "proizvodjac")
VALUES (-100, 'TestNaziv', 1);
INSERT INTO "proizvodjac"("id", "naziv", "adresa", "kontakt")
VALUES (-100, 'TestNaziv', 'TestAdr', '+38121111111');
INSERT INTO "racun"("id", "datum", "nacin_placanja")
VALUES (-100, to_date('01.01.2020.', 'dd.mm.yyyy.'), 'gotovina');
INSERT INTO "stavka_racuna"("id", "racun", "redni_broj", "proizvod", "kolicina", "jedinica_mere", "cena")
VALUES (-100, 1, 1, 1, 1, 'komad', 100);