# Delegation:
In software engineering, the delegation pattern is an object-oriented design pattern 
that allows object composition to achieve the same code reuse as inheritance.

In delegation, an object handles a request by delegating to a second object (the 
delegate). The delegate is a helper object, but with the original context. With 
language-level support for delegation, this is done implicitly by having self in 
the delegate refer to the original (sending) object, not the delegate (receiving 
object). In the delegate pattern, this is instead accomplished by explicitly passing
the original object to the delegate, as an argument to a method.

Шаблон делегирования является фундаментальной абстракцией, на основе которой 
реализованы другие шаблоны - композиция (также называемая агрегацией), примеси 
(mixins) и аспекты (aspects).

![link](https://drive.google.com/uc?id=1lLlsflryPvZaUyI79uLIMUcLfnhLbJvG)
