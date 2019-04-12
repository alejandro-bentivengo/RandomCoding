import java.util.ArrayList;
import java.util.List;

/**
 * Spiral class to solve an XxY dimension array
 * @author Alejandro Bentivengo
 */
public class Spiral {
    /**
     * Main class to display time of the algorithm as well
     */
    public static void main(String[] args) {
        int[][] values = new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}, {10, 11, 12}};
        long start = System.nanoTime();
        Spiral.solution(values);
        long end = System.nanoTime();
        System.out.println("Total time: " + (double) (end - start) / (double) 1000000 + "ms");
    }

    /**
     * Receives a 2D matrix and prints its values in a spiral form
     *
     * @param matrix 2D Integer matrix
     */
    public static void solution(int[][] matrix) {
        if (matrix.length > 0) {
            // Matrix parameters
            int width = matrix[0].length;
            int height = matrix.length;
            int totalValues = matrix[0].length * matrix.length;

            // Offsets used to go around the matrix
            int offsetL = 0;
            int offsetR = 0;
            int offsetT = 0;
            int offsetB = 0;

            // Values are stored in a list until needed
            List<Integer> finalValues = new ArrayList();

            // Cartesian axis used to go through the matrix
            int x = 0;
            int y = 0;

            // Looping the matrix until all the values are accounted for
            // After each FOR loop there is an escape route to break the while in order to stop the cycle in case all values are already accounted
            while (finalValues.size() <= totalValues) {
                // First round from left to right
                for (int i = 0 + offsetL; i < width - offsetR; i++) {
                    x = i;
                    finalValues.add(matrix[y][x]);
                }
                offsetT++;
                if (finalValues.size() >= totalValues) break;
                // Second round from top to bottom
                for (int j = 0 + offsetT; j < height - offsetB; j++) {
                    y = j;
                    finalValues.add(matrix[y][x]);
                }
                offsetR++;
                if (finalValues.size() >= totalValues) break;
                // Third round from right to left
                for (int i = width - offsetR - 1; i > -1 + offsetL; i--) {
                    x = i;
                    finalValues.add(matrix[y][x]);
                }
                offsetB++;
                if (finalValues.size() >= totalValues) break;
                // Fourth round from bottom to top
                for (int j = height - offsetB - 1; j > -1 + offsetT; j--) {
                    y = j;
                    finalValues.add(matrix[y][x]);
                }
                offsetL++;
            }
            // Adding all values into a String to be displayed below
            String spiral = "";
            for (Integer temp : finalValues) {
                spiral = spiral.concat(temp + " ");
            }
            System.out.println(spiral);
        } else {
            System.out.println("");
        }
    }
}
