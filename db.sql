CREATE TABLE public.vrsta_pregleda (
	opis_pregleda varchar NULL,
	id int8 NOT NULL,
	CONSTRAINT vrsta_pregleda_pkey PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
) ;


INSERT INTO public.vrsta_pregleda (opis_pregleda,id) VALUES (
'Potpuni sistematski pregled',1);
INSERT INTO public.vrsta_pregleda (opis_pregleda,id) VALUES (
'Osnovni sistematski pregled',2);

CREATE TABLE public.termini (
	termin_pregleda timestamp NULL,
	pacijent_prezime varchar(60) NULL,
	pacijent_ime varchar(60) NULL,
	vrsta_pregleda int4 NULL DEFAULT 1,
	id int8 NOT NULL,
	CONSTRAINT termini_pkey PRIMARY KEY (id),
	CONSTRAINT termini_vrsta_pregleda_fk FOREIGN KEY (id) REFERENCES public.vrsta_pregleda(id)
)
WITH (
	OIDS=FALSE
) ;

INSERT INTO public.termini (termin_pregleda,pacijent_prezime,pacijent_ime,vrsta_pregleda,id) VALUES (
'2017-12-26 17:59:16.000','Filipović','Filip',1,1);
INSERT INTO public.termini (termin_pregleda,pacijent_prezime,pacijent_ime,vrsta_pregleda,id) VALUES (
'2017-11-11 17:59:16.000','Josipović','Josip',2,2);



