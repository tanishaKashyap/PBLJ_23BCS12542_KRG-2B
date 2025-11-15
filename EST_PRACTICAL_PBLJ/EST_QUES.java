class NumberPrinter {
    int number = 1;
    int maxLimit = 15;

    synchronized void printOdd() {
        while (number <= maxLimit) {
            while (number % 2 == 0) {
                try {
                    wait();
                } catch (Exception e) {}
            }
            System.out.println("Odd Number: " + number);
            number++;
            notify();
        }
    }
    synchronized void printEven() {
        while (number <= maxLimit) {
            while (number % 2 != 0) {
                try {
                    wait();
                } catch (Exception e) {}
            }
            System.out.println("Even Number: " + number);
            number++;
            notify();
        }
    }
}

class OddThread extends Thread {
    NumberPrinter printer;
    OddThread(NumberPrinter printer) {
        this.printer = printer;
    }
    public void run() {
        printer.printOdd();
    }
}
class EvenThread extends Thread {
    NumberPrinter printer;
    EvenThread(NumberPrinter printer) {
        this.printer = printer;
    }
    public void run() {
        printer.printEven();
    }
}
public class EST_QUES {
    public static void main(String[] args) {

        NumberPrinter printer = new NumberPrinter();

        OddThread t1 = new OddThread(printer);
        EvenThread t2 = new EvenThread(printer);

        t1.start();
        t2.start();
    }
}
