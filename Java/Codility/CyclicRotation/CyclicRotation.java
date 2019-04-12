import java.util.concurrent.atomic.AtomicInteger;

/**
 * CyclicRotation class to solve codility problem
 *
 * @author Alejandro Bentivengo
 * @see <a href="https://app.codility.com/programmers/lessons/2-arrays/cyclic_rotation/">https://app.codility.com/programmers/lessons/2-arrays/cyclic_rotation/</a>
 */
public class CyclicRotation {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        long start = System.nanoTime();
        int[] arr = CyclicRotation.solution(new int[]{1, 2, 3, 4, 5}, 2);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     *
     * @param A Array of values to rotate K amount of times
     * @param K Value to rotate the array A
     * @return Rotated Array
     */
    public static int[] solution(int[] A, int K) {
        if (A.length == 0) {
            return A;
        }
        for (int i = 0; i < K; i++) {
            int helperLast = A[A.length - 1 ];
            for (int index = 0; index < A.length; index++) {
                int helperCurrent = A[index];
                A[index] = helperLast;
                helperLast = helperCurrent;
            }
        }
        return A;
    }
}
