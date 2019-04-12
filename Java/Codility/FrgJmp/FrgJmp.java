import java.util.HashMap;
import java.util.Map;

/**
 * FrgJmp class to solve codility problem
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/3-time_complexity/frog_jmp/">https://app.codility.com/programmers/lessons/3-time_complexity/frog_jmp/</a>
 */
public class FrgJmp {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        System.out.print(FrgJmp.solution(10, 85, 30));
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * Very easy solution that involves just normal math to resolve it
     * @param X initial X point
     * @param Y final destination
     * @param D distance per jump
     * @return jump count
     */
    public static int solution(int X, int Y, int D) {
        return (int) Math.ceil(((double) Y - (double) X) / (double) D);
    }
}
