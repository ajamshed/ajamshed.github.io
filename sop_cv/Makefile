all: cv #app sop

app:
	texi2pdf apsys2011-app.tex
sop:
	texi2pdf 26policy.tex

cv:
	texi2pdf ajamshed.tex
	texi2dvi ajamshed.tex
	dvips ajamshed.dvi
	texi2pdf ajamshed-visa.tex
	texi2dvi ajamshed-visa.tex
	dvips ajamshed-visa.dvi
	texi2pdf ajamshed-pro.tex
	texi2dvi ajamshed-pro.tex
	dvips ajamshed-pro.dvi
	texi2pdf ajamshed-short.tex
	texi2dvi ajamshed-short.tex
	dvips ajamshed-short.dvi

clean:
	rm -rf *.log *.pdf *.ps *.dvi *.out *~
