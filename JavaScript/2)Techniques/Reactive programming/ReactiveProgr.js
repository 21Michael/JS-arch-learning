/*
Reactive programming - парадигма программирования, ориентированная на потоки данных и распространение изменений.
  Это означает, что должна существовать возможность легко выражать статические и динамические потоки данных, а также то,
  что нижележащая модель исполнения должна автоматически распространять изменения благодаря потоку данных.
Поток (Stream) — это серия событий, происходящих за определенный период времени. Поток может использоваться для обработки
  любого типа событий: клики и скролл мыши, ввод с клавиатуры, обработка данных и т.д. Если представить поток, как переменную,
  она будет реагировать на любые изменения ее значений.
Example:
  1)Imperative:
    var a = 2;
    var b = 4;
    var c = a + b;
    console.log(c); //-> 6
    a = 10;  // переопределим a
    console.log(c); //-> по-прежнему 6
  2)Reactive (works on streams):
    var A$ = 2;
    var B$ = 4;
    var C$ = A$ + B$;
    console.log(C$); //-> 6
    A$ = 10;
    console.log(C$); //->  16
 */